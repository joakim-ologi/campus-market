import CommonTypes "common";

module {
  public type Campus = Text;

  public type RegistrationMethod = {
    #email : Text;
    #phone : Text;
  };

  public type Profile = {
    id : CommonTypes.UserId;
    var name : Text;
    var whatsappPhone : Text;
    var campus : Campus;
    var registrationMethod : RegistrationMethod;
    var createdAt : CommonTypes.Timestamp;
  };

  // Shared (API boundary) version — no mutable fields
  public type ProfileView = {
    id : CommonTypes.UserId;
    name : Text;
    whatsappPhone : Text;
    campus : Campus;
    registrationMethod : RegistrationMethod;
    createdAt : CommonTypes.Timestamp;
  };

  public type RegisterInput = {
    name : Text;
    whatsappPhone : Text;
    campus : Campus;
    registrationMethod : RegistrationMethod;
  };

  public type UpdateProfileInput = {
    name : Text;
    whatsappPhone : Text;
  };
};
