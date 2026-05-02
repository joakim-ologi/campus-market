import List "mo:core/List";
import Map "mo:core/Map";
import ItemTypes "../types/item";
import ProfileTypes "../types/profile";
import CommonTypes "../types/common";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Order "mo:core/Order";

module {
  public type Item = ItemTypes.Item;
  public type ItemView = ItemTypes.ItemView;
  public type CreateItemInput = ItemTypes.CreateItemInput;
  public type UpdateItemInput = ItemTypes.UpdateItemInput;
  public type BrowseFilter = ItemTypes.BrowseFilter;
  public type PageResult = ItemTypes.PageResult;

  /// Convert internal Item to shareable ItemView, embedding seller WhatsApp.
  public func toView(
    self : Item,
    sellerWhatsapp : Text,
  ) : ItemView {
    {
      id = self.id;
      seller = self.seller;
      sellerWhatsapp;
      title = self.title;
      description = self.description;
      priceKES = self.priceKES;
      category = self.category;
      imageRefs = self.imageRefs;
      status = self.status;
      createdAt = self.createdAt;
      updatedAt = self.updatedAt;
    };
  };

  /// Create a new listing for the caller.
  public func createItem(
    items : List.List<Item>,
    nextId : Nat,
    sellerId : CommonTypes.UserId,
    input : CreateItemInput,
  ) : (Item, Nat) {
    let now = Time.now();
    let item : Item = {
      id = nextId;
      seller = sellerId;
      var title = input.title;
      var description = input.description;
      var priceKES = input.priceKES;
      var category = input.category;
      var imageRefs = input.imageRefs;
      var status = #active;
      var createdAt = now;
      var updatedAt = now;
    };
    items.add(item);
    (item, nextId + 1);
  };

  /// Update an existing listing. Caller must own the item.
  public func updateItem(
    items : List.List<Item>,
    callerId : CommonTypes.UserId,
    itemId : CommonTypes.ItemId,
    input : UpdateItemInput,
  ) : { #ok; #notFound; #unauthorized } {
    switch (items.find(func(i : Item) : Bool { i.id == itemId })) {
      case null { #notFound };
      case (?item) {
        if (not Principal.equal(item.seller, callerId)) { return #unauthorized };
        item.title := input.title;
        item.description := input.description;
        item.priceKES := input.priceKES;
        item.category := input.category;
        item.imageRefs := input.imageRefs;
        item.updatedAt := Time.now();
        #ok;
      };
    };
  };

  /// Delete an item. Caller must own the item.
  public func deleteItem(
    items : List.List<Item>,
    callerId : CommonTypes.UserId,
    itemId : CommonTypes.ItemId,
  ) : { #ok; #notFound; #unauthorized } {
    switch (items.findIndex(func(i : Item) : Bool { i.id == itemId })) {
      case null { #notFound };
      case (?idx) {
        let item = items.at(idx);
        if (not Principal.equal(item.seller, callerId)) { return #unauthorized };
        let kept = items.filter(func(i : Item) : Bool { i.id != itemId });
        items.clear();
        items.append(kept);
        #ok;
      };
    };
  };

  /// Mark an item as sold. Caller must own the item.
  public func markSold(
    items : List.List<Item>,
    callerId : CommonTypes.UserId,
    itemId : CommonTypes.ItemId,
  ) : { #ok; #notFound; #unauthorized } {
    switch (items.find(func(i : Item) : Bool { i.id == itemId })) {
      case null { #notFound };
      case (?item) {
        if (not Principal.equal(item.seller, callerId)) { return #unauthorized };
        item.status := #sold;
        item.updatedAt := Time.now();
        #ok;
      };
    };
  };

  /// Browse active items with filtering, search, sort, and pagination.
  public func browseItems(
    items : List.List<Item>,
    profiles : Map.Map<CommonTypes.UserId, ProfileTypes.Profile>,
    filter : BrowseFilter,
    offset : Nat,
    limit : Nat,
  ) : PageResult {
    // Filter active items
    let active = items.filter(func(i : Item) : Bool { i.status == #active });

    // Apply keyword filter
    let afterKeyword = switch (filter.keyword) {
      case null { active };
      case (?kw) {
        let lower = kw.toLower();
        active.filter(func(i : Item) : Bool {
          i.title.toLower().contains(#text lower) or
          i.description.toLower().contains(#text lower)
        });
      };
    };

    // Apply category filter
    let afterCategory = switch (filter.category) {
      case null { afterKeyword };
      case (?cat) {
        afterKeyword.filter(func(i : Item) : Bool { i.category == cat });
      };
    };

    // Apply price filters
    let afterMin = switch (filter.minPriceKES) {
      case null { afterCategory };
      case (?minP) {
        afterCategory.filter(func(i : Item) : Bool { i.priceKES >= minP });
      };
    };
    let afterMax = switch (filter.maxPriceKES) {
      case null { afterMin };
      case (?maxP) {
        afterMin.filter(func(i : Item) : Bool { i.priceKES <= maxP });
      };
    };

    // Sort
    let sorted = switch (filter.sortOrder) {
      case (#newest) {
        afterMax.sort(func(a : Item, b : Item) : Order.Order {
          Int.compare(b.createdAt, a.createdAt)
        });
      };
      case (#priceAsc) {
        afterMax.sort(func(a : Item, b : Item) : Order.Order {
          Nat.compare(a.priceKES, b.priceKES)
        });
      };
      case (#priceDesc) {
        afterMax.sort(func(a : Item, b : Item) : Order.Order {
          Nat.compare(b.priceKES, a.priceKES)
        });
      };
    };

    let total = sorted.size();

    // Paginate
    let pageIter = sorted.values().drop(offset).take(limit);

    // Map to views
    let pageItems = pageIter.map(func(i : Item) : ItemView {
      let whatsapp = switch (profiles.get(i.seller)) {
        case (?p) { p.whatsappPhone };
        case null { "" };
      };
      toView(i, whatsapp);
    }).toArray();

    { items = pageItems; total; offset; limit };
  };

  /// Get a single item by id (includes seller WhatsApp for contact redirect).
  public func getItem(
    items : List.List<Item>,
    profiles : Map.Map<CommonTypes.UserId, ProfileTypes.Profile>,
    itemId : CommonTypes.ItemId,
  ) : ?ItemView {
    switch (items.find(func(i : Item) : Bool { i.id == itemId })) {
      case null { null };
      case (?item) {
        let whatsapp = switch (profiles.get(item.seller)) {
          case (?p) { p.whatsappPhone };
          case null { "" };
        };
        ?(toView(item, whatsapp));
      };
    };
  };

  /// List all items owned by a seller.
  public func getMyListings(
    items : List.List<Item>,
    profiles : Map.Map<CommonTypes.UserId, ProfileTypes.Profile>,
    sellerId : CommonTypes.UserId,
  ) : [ItemView] {
    let myItems = items.filter(func(i : Item) : Bool { Principal.equal(i.seller, sellerId) });
    let whatsapp = switch (profiles.get(sellerId)) {
      case (?p) { p.whatsappPhone };
      case null { "" };
    };
    myItems.toArray().map<Item, ItemView>(func(i) { toView(i, whatsapp) });
  };
};
