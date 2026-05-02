import Map "mo:core/Map";
import List "mo:core/List";
import ProfileTypes "types/profile";
import ItemTypes "types/item";
import CommonTypes "types/common";
import ProfileApi "mixins/profile-api";
import ItemApi "mixins/item-api";

actor {
  let profiles = Map.empty<CommonTypes.UserId, ProfileTypes.Profile>();
  let items = List.empty<ItemTypes.Item>();
  let itemCounter = { var next : Nat = 0 };

  include ProfileApi(profiles);
  include ItemApi(items, profiles, itemCounter);
};
