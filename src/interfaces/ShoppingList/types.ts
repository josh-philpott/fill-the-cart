import { quantityType } from "./enums"

interface GroceryItem {
  id: string
  name: string
  category: string
  quantity?: number
  quantityType?: quantityType
  inCart: boolean
}

/**
 * The following sections should be defined by react-native but I couldn't find them in the typescript
 * defenition files?
 */

interface SectionListData {
  data: GroceryItem[]
  title: string
}
