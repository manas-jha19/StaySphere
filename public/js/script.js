(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// For index page js


function scrollCategories(value) {
    document.getElementById("filters")
      .scrollBy({ left: value, behavior: "smooth" });
  }

  let NewToggle = document.querySelector(".tax-toggle");
 
  NewToggle.addEventListener("change",()=>{
     let listingPrice = document.querySelectorAll(".listingPrice").forEach(priceEl=>{
        let base = priceEl.dataset.price;
        if(taxToggle.checked){
                final = base * 1.1;
                     priceEl.innerHTML =
  `₹ ${Math.floor(final).toLocaleString("en-IN")} / Night  (Include taxes)`;
          }else{
                final = base;
                priceEl.innerHTML =`₹ ${Math.floor(final).toLocaleString("en-IN")} / Night`;
           };
     });
    
  });