class StatReport {
  static statsObj = {

    // Counter for @Route API/v1/logins
    "POST:/Api/v1/logins": 0,

    // Counter for @Route API/v1/patients
    "GET:/API/v1/patients": 0,
    "GET:/API/v1/patients/:id": 0,
    "POST:/API/v1/patients": 0,
    "PUT:/API/v1/patients/:id": 0,
    "DELETE:/API/v1/patients/:id": 0,

    // Counter for @Route API/v1/medications
    "GET:/API/v1/medications/:id": 0,

    // Counter for @Route API/v1/doses
    "GET:/API/v1/doses/:pId/:mId": 0,
    "POST:/API/v1/doses/:pId/:mId": 0,
    "PUT:/API/v1/doses/:pId/:mId": 0,
    "DELETE:/API/v1/doses/:pId/:mId": 0
  };
}

export default StatReport;
