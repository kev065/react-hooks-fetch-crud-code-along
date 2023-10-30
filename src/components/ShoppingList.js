import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  
  useEffect(()=>{
    fetch(" http://localhost:3000/items")
    .then((resp)=>resp.json())
    .then(item=>setItems(item))

  },[])
  function handleItem(newItem){
    console.log("in Shopping LIst",newItem)
    setItems([...items,newItem]);

  }

  function handleUpdatedItem(updatedItem){
    console.log("in Shopping LIst",updatedItem)
    const updatedItems=items.map((item)=>{
      if(item.id===updatedItem.id){
        return updatedItem;
      }else{
        return item;
      }
    })
    setItems(updatedItems);
  }
  function handleDeleteItem(deletedItem){
    const updateItems=items.filter((item)=>
      item.id!==deletedItem.id);
      setItems(updateItems);    
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item}  onUpdateItem={handleUpdatedItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;