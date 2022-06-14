exports.validation = (firstName, lastName, phone, synagogue) => {

    if (firstName.length == 0) {
      return false;
    }
    if (lastName.length == 0) {
      return false;
    }
    if (phone.length != 10 || phone[0] != "0" || phone[1] != "5") {
      return false;
    }
    if (synagogue === "בחר בית כנסת") {
      return false;
    }
    return true;
  };