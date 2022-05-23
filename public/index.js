

const data = fetch("http://localhost:4000/api").then((res) => {
  if (!res.ok) {
    //! error handling
    throw new Error(`Something Went Wrong:${res.status}`);
  }
  return res.json();
}).then(data => dataHanndleToUI(data)).catch((err) => console.log(err) )



const dataHanndleToUI = (data) => {
  const table = document.querySelector(".table")
  data.forEach(item => {
    console.log(item)
    table.innerHTML += `<tr>
    <td>${item.edition}</td>
    <td>${item.date}</td>
    <td>${item.year}</td>
    <td>${item.category}</td>
    <td>${item.title}</td>
    <td>${item.author}</td>
    <td>${item.url}</td>
  </tr>`;
  })

}