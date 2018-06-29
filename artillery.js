const rng = (context, events, next) => {
  context.vars.listingId = Math.ceil(Math.random() * 10000000);
  return next();
};

module.exports = {
  rng: rng
};
