export const categoryList = [
    {
      value: "grocery",
      label: "Grocery",
    },
    {
      value: "fuel",
      label: "Fuel",
    },
    {
      value: "medicine",
      label: "Medicine",
    },
    {
      value: "vegetable",
      label: "Vegetable",
    },
    {
      value: "other",
      label: "Other",
    },
  ];



  export const combinedExpenses = (expenses)=>{
        return expenses.reduce((acc, expense) => {
        const existingCategory = acc.find(item => item.label === expense.category);
    
        if (existingCategory) {
            existingCategory.value += expense.amount;
        } else {
            acc.push({ label: expense.category, value: expense.amount , id : expense.Id });
        }
    
        return acc;
    }, []);
  }
