import List "mo:core/List";
import Map "mo:core/Map";
import ItemLib "../lib/item";
import ItemTypes "../types/item";
import ProfileTypes "../types/profile";
import CommonTypes "../types/common";

mixin (
  items : List.List<ItemTypes.Item>,
  profiles : Map.Map<CommonTypes.UserId, ProfileTypes.Profile>,
  itemCounter : { var next : Nat },
) {
  /// Create a new item listing.
  public shared ({ caller }) func createItem(
    input : ItemTypes.CreateItemInput
  ) : async { #ok : ItemTypes.ItemView; #err : Text } {
    let (item, newId) = ItemLib.createItem(items, itemCounter.next, caller, input);
    itemCounter.next := newId;
    let whatsapp = switch (profiles.get(caller)) {
      case (?p) { p.whatsappPhone };
      case null { "" };
    };
    #ok (item.toView(whatsapp));
  };

  /// Update an existing listing owned by the caller.
  public shared ({ caller }) func updateItem(
    itemId : CommonTypes.ItemId,
    input : ItemTypes.UpdateItemInput,
  ) : async { #ok; #notFound; #unauthorized } {
    ItemLib.updateItem(items, caller, itemId, input);
  };

  /// Delete an item owned by the caller.
  public shared ({ caller }) func deleteItem(
    itemId : CommonTypes.ItemId
  ) : async { #ok; #notFound; #unauthorized } {
    ItemLib.deleteItem(items, caller, itemId);
  };

  /// Mark an item as sold.
  public shared ({ caller }) func markSold(
    itemId : CommonTypes.ItemId
  ) : async { #ok; #notFound; #unauthorized } {
    ItemLib.markSold(items, caller, itemId);
  };

  /// Browse active listings with optional filters, search, sort, and pagination.
  public query func browseItems(
    filter : ItemTypes.BrowseFilter,
    offset : Nat,
    limit : Nat,
  ) : async ItemTypes.PageResult {
    ItemLib.browseItems(items, profiles, filter, offset, limit);
  };

  /// Get a single item by id (includes seller WhatsApp number).
  public query func getItem(
    itemId : CommonTypes.ItemId
  ) : async ?ItemTypes.ItemView {
    ItemLib.getItem(items, profiles, itemId);
  };

  /// List all items posted by the caller.
  public shared query ({ caller }) func getMyListings() : async [ItemTypes.ItemView] {
    ItemLib.getMyListings(items, profiles, caller);
  };
};
