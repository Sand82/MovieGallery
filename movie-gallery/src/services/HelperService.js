export const formatData = (currentDate) => {
    
    const dataChange = new Date(currentDate).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});     
      
      return dataChange;
}