import natural from 'natural'
import { Keyword } from '../app/module/keyword/keyword.model'
export const findAndStoreKeyword = async (
  searchText: string,
): Promise<void> => {
  /*
   * Remove searchText space or plural word
   * For Example
   * Search Text - " Apples "
   * Remove space or plural word
   * Return Result "Apple"
   */
  const searchWord = natural.PorterStemmer.stem(searchText)

  //* Check Already exist in our database searchText
  const searchDataStore = await Keyword.findOne({ searchTerm: searchWord })

  //* If Exist
  if (searchDataStore) {
    /*
     * Increase count value 1
     * and save count data into database
     */
    searchDataStore.count = searchDataStore.count + 1
    await searchDataStore.save()
  } else {
    //* If not exist store data into database
    await Keyword.create({ searchTerm: searchWord })
  }
}
