class UsersService {
  constructor() {
    this.users = [];
  }

  find(limit, offset) {
    return {
      limit,
      offset,
    };
  }
}

module.exports = UsersService;
