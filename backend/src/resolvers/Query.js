const { forwardTo } = require('prisma-binding'); // the ability to query the database
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // Check if the user has permissions to query all the users
    return ctx.db.query.users({}, info);

    // if they do, query all the users
  },
};

module.exports = Query;
