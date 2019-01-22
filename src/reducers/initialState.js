import uuidv1 from "uuid/v1"
import { quantityType } from "../interfaces/ShoppingList/enums"

export default {
  categorySortOrder: ["Produce", "Meat", "Pantry", "Other", "In Cart"],
  items: [
    {
      id: uuidv1(),
      category: "Produce",
      name: "Shallots",
      quantity: 1,
      inCart: false
    },
    {
      id: uuidv1(),
      category: "Produce",
      name: "Carrots",
      quantity: 2,
      inCart: false
    },
    {
      id: uuidv1(),
      category: "Meat",
      name: "Ground Turkey",
      quantity: 1,
      quantityType: quantityType.lbs,
      inCart: false
    },
    { id: uuidv1(), category: "Pantry", name: "Soy Sauce", inCart: false },
    {
      id: uuidv1(),
      category: "Pantry",
      name: "Rice Vinegar",
      inCart: false
    },
    {
      id: uuidv1(),
      category: "Pantry",
      name: "Brown Sugar",
      quantity: 2,
      quantityType: quantityType.cups,
      inCart: false
    },
    {
      id: uuidv1(),
      category: "Pantry",
      name: "Jasmine Rice",
      quantity: 1,
      quantityType: quantityType.cups,
      inCart: false
    }
  ]
}
