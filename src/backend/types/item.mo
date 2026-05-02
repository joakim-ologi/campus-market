import CommonTypes "common";

module {
  public type Category = {
    #Electronics;
    #BedsAndMattresses;
    #Clothes;
    #Books;
    #HouseItems;
  };

  public type ItemStatus = {
    #active;
    #sold;
  };

  public type SortOrder = {
    #newest;
    #priceAsc;
    #priceDesc;
  };

  public type Item = {
    id : CommonTypes.ItemId;
    seller : CommonTypes.UserId;
    var title : Text;
    var description : Text;
    var priceKES : Nat;
    var category : Category;
    var imageRefs : [Text]; // up to 5 object-storage refs
    var status : ItemStatus;
    var createdAt : CommonTypes.Timestamp;
    var updatedAt : CommonTypes.Timestamp;
  };

  // Shared (API boundary) version — no mutable fields
  public type ItemView = {
    id : CommonTypes.ItemId;
    seller : CommonTypes.UserId;
    sellerWhatsapp : Text;
    title : Text;
    description : Text;
    priceKES : Nat;
    category : Category;
    imageRefs : [Text];
    status : ItemStatus;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  public type CreateItemInput = {
    title : Text;
    description : Text;
    priceKES : Nat;
    category : Category;
    imageRefs : [Text];
  };

  public type UpdateItemInput = {
    title : Text;
    description : Text;
    priceKES : Nat;
    category : Category;
    imageRefs : [Text];
  };

  public type BrowseFilter = {
    keyword : ?Text;
    category : ?Category;
    minPriceKES : ?Nat;
    maxPriceKES : ?Nat;
    sortOrder : SortOrder;
  };

  public type PageResult = {
    items : [ItemView];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };
};
