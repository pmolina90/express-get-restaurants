const request = require("supertest");
const app = require("./src/app");
const { Restaurant } = require("./models/index");
const syncSeed = require("./seed");
let restQuantity;

beforeAll(async () => {
  await syncSeed();
  const restaurants = await Restaurant.findAll({});
  restQuantity = restaurants.length;
});

test("should return 200 on get", async () => {
  const response = await request(app).get("/restaurants");
  expect(response.statusCode).toEqual(200);
});

test("should return array of restaurants", async () => {
  const response = await request(app).get("/restaurants");
  expect(Array.isArray(response.body)).toBe(true);
  expect(resonse.body[0]).tohaveProperty("cuisine");
});

test("should return the correct # of restaurants", async () => {
  const response = await request(app).get("/restaurants");
  expect(response.body.length).toEqual(restQuantity);
});

test("should return correct restaurant data", async () => {
  const response = await request(app).get("/restaurants");
  expect(response.body).toContainEqual(
    expect.objectContaining({
      id: 1,
      name: "AppleBees",
      location: "Texas",
      cuisine: "FastFood",
    })
  );
});

test("should return correct restaurant", async () => {
  const response = await request(app).get("/restaurants/1");
  expect(response.body).toEqual(
    expect.objectContaining({
      id: 1,
      name: "AppleBees",
      location: "Texas",
      cuisine: "FastFood",
    })
  );
});

test("should return larger restaurant array", async () => {
  const response = await request(app)
    .post("/restaurants")
    .send({ name: "DoggyDog", location: "NYC", cuisine: "Vegetarian" });
  expect(response.body.length).toEqual(restQuantity + 1);
});

test("should update first item in database", async () => {
  await request(app)
    .put("restaurant/1")
    .send({ name: "AAA", location: "FL", cuisine: "Latin" });
  const restaurant = await Restaurant.findByPk(1);
  expect(restaurant.name).toEqual("AAA");
});

test("should delete entry by id", async () => {
  await request(app).delete("restaurants/1");
  const restaurants = await Restaurant.findall({});
  expect(restaurants.length).toEqual(restQuantity);
  expect(restaurants[0].id).not.toEqual(1);
});
