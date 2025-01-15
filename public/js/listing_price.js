function clearForm() {
    const numberInputs = document.querySelectorAll("input[type='number']");
    const textInputs = document.querySelectorAll("input[type='text']");

    numberInputs.forEach(input => {
        if (!input.readOnly) {
            input.value = ''; // Clear only non-readonly number inputs
        }
    });

    textInputs.forEach(input => {
        if (!input.readOnly) {
            input.value = ''; // Clear only non-readonly text inputs
        }
    });
}


function confirmDelete(event) {
    if (!confirm("Are you sure you want to delete this item?")) {
        event.preventDefault(); // Prevent form submission if user clicks "Cancel"
    }
}

