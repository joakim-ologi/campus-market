import Map "mo:core/Map";
import ProfileLib "../lib/profile";
import ProfileTypes "../types/profile";
import CommonTypes "../types/common";

mixin (
  profiles : Map.Map<CommonTypes.UserId, ProfileTypes.Profile>
) {
  /// Register the caller as a new user.
  public shared ({ caller }) func register(
    input : ProfileTypes.RegisterInput
  ) : async { #ok : ProfileTypes.ProfileView; #err : Text } {
    ProfileLib.register(profiles, caller, input);
  };

  /// Return the caller's own profile.
  public shared query ({ caller }) func getMyProfile() : async ?ProfileTypes.ProfileView {
    ProfileLib.getProfile(profiles, caller);
  };

  /// Return a public profile by user id.
  public query func getProfile(
    userId : CommonTypes.UserId
  ) : async ?ProfileTypes.ProfileView {
    ProfileLib.getProfile(profiles, userId);
  };

  /// Update the caller's mutable profile fields.
  public shared ({ caller }) func updateProfile(
    input : ProfileTypes.UpdateProfileInput
  ) : async { #ok : ProfileTypes.ProfileView; #err : Text } {
    ProfileLib.updateProfile(profiles, caller, input);
  };
};
