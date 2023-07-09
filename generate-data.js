import { faker, fakerTR } from "@faker-js/faker"
import { writeFile } from "fs"


const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach((_, index) => {
    const category = {
      id: index + 1,
      name: fakerTR.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach((_, index) => {
      const name = fakerTR.commerce.productName();
      const description = fakerTR.commerce.productDescription()

      const product = {
        categoryId: category.id,
        id: index + 1,
        name,
        color: fakerTR.color.human(),
        price: Number.parseFloat(fakerTR.commerce.price()),
        description,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: fakerTR.image.imageUrl(400, 400),
      };

      productList.push(product);
    });
  }

  return productList;
};

function randomUserList(numberOfUser) {
  if (numberOfUser <= 0) return [];
  const userList = []

  Array.from(new Array(numberOfUser)).forEach((_, index) => {
    const sex = fakerTR.person.sexType();
    const firstName = fakerTR.person.firstName(sex);
    const lastName = fakerTR.person.lastName();
    const email = faker.helpers.unique(fakerTR.internet.email, [
      firstName,
      lastName,
    ]);

    const user = {
      _id: index + 1,
      avatar: fakerTR.image.avatar(),
      birthday: fakerTR.date.birthdate(),
      email,
      firstName,
      lastName,
      sex,
      subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
    };

    userList.push(user)
  })
  return userList;
}
const userList = randomUserList(5);
const categoryList = randomCategoryList(5)
const productList = randomProductList(categoryList, 5)

const db = {
  categories: categoryList,
  users: userList,
  products: productList,
}

writeFile("db.json", JSON.stringify(db), () => {
  console.log("Generate data successfully =))");
});