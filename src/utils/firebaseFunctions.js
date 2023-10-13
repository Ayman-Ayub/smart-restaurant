import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
export const saveBooking = async (data) => {
  await setDoc(doc(firestore, "Booking", `${Date.now()}`), data, {
    merge: true,
  });
};
// Saving new table
export const saveVendor = async (data) => {
  await setDoc(doc(firestore, "Vendor", `${Date.now()}`), data, {
    merge: true,
  });
};
// Saving new table
export const saveTable = async (tabledata) => {
  await setDoc(doc(firestore, "Table", `${Date.now()}`), tabledata, {
    merge: true,
  });
};
// Saving new Review
export const saveReview = async (reviewdata) => {
  await setDoc(doc(firestore, "Review", `${Date.now()}`), reviewdata, {
    merge: true,
  });
};
// Saving new Item
export const saveUser = async (userdata) => {
  await setDoc(doc(firestore, "User", `${Date.now()}`), userdata, {
    merge: true,
  });
};
// getall food items
export const getAllUser = async () => {
  const user = await getDocs(
    query(collection(firestore, "User"), orderBy("id", "desc"))
  );

  return user.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// Saving new freshItem
export const savefreshItem = async (data) => {
  await setDoc(doc(firestore, "freshfoodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllfreshFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "freshfoodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};


// Saving new category
export const saveCategory = async (datacategory) => {
  await setDoc(doc(firestore, "foodCategory", `${Date.now()}`), datacategory, {
    merge: true,
  });
};

// getall food categories
export const getAllCategories = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodCategory"))
  );

  return items.docs.map((doc) => doc.data());
};

export const saveFreshCategory = async (datafoodcategory) => {
  await setDoc(doc(firestore, "freshfoodCategory", `${Date.now()}`), datafoodcategory, {
    merge: true,
  });
};

// getall food categories
export const getAllFreshCategories = async () => {
  const items = await getDocs(
    query(collection(firestore, "freshfoodCategory"))
  );

  return items.docs.map((doc) => doc.data());
};
