import Map "mo:core/Map";
import ProfileTypes "../types/profile";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type Profile = ProfileTypes.Profile;
  public type ProfileView = ProfileTypes.ProfileView;
  public type RegisterInput = ProfileTypes.RegisterInput;
  public type UpdateProfileInput = ProfileTypes.UpdateProfileInput;

  /// Convert an internal Profile to a shareable ProfileView.
  public func toView(self : Profile) : ProfileView {
    {
      id = self.id;
      name = self.name;
      whatsappPhone = self.whatsappPhone;
      campus = self.campus;
      registrationMethod = self.registrationMethod;
      createdAt = self.createdAt;
    };
  };

  /// Register a new user profile. Returns #ok or #err if already exists.
  public func register(
    profiles : Map.Map<CommonTypes.UserId, Profile>,
    callerId : CommonTypes.UserId,
    input : RegisterInput,
  ) : { #ok : ProfileView; #err : Text } {
    if (profiles.containsKey(callerId)) {
      return #err "Already registered";
    };
    let profile : Profile = {
      id = callerId;
      var name = input.name;
      var whatsappPhone = input.whatsappPhone;
      var campus = input.campus;
      var registrationMethod = input.registrationMethod;
      var createdAt = Time.now();
    };
    profiles.add(callerId, profile);
    #ok (toView(profile));
  };

  /// Get profile for a given user.
  public func getProfile(
    profiles : Map.Map<CommonTypes.UserId, Profile>,
    userId : CommonTypes.UserId,
  ) : ?ProfileView {
    switch (profiles.get(userId)) {
      case (?p) { ?toView(p) };
      case null { null };
    };
  };

  /// Update mutable profile fields for caller.
  public func updateProfile(
    profiles : Map.Map<CommonTypes.UserId, Profile>,
    callerId : CommonTypes.UserId,
    input : UpdateProfileInput,
  ) : { #ok : ProfileView; #err : Text } {
    switch (profiles.get(callerId)) {
      case null { #err "Profile not found" };
      case (?p) {
        p.name := input.name;
        p.whatsappPhone := input.whatsappPhone;
        #ok (toView(p));
      };
    };
  };

  /// Return true if the caller has a registered profile.
  public func isRegistered(
    profiles : Map.Map<CommonTypes.UserId, Profile>,
    callerId : CommonTypes.UserId,
  ) : Bool {
    profiles.containsKey(callerId);
  };
};
