interface GroceryItem {
  id: string
  category: string
  name: string
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
