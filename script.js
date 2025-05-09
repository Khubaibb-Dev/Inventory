document.addEventListener('DOMContentLoaded', function() {
    const inventoryForm = document.getElementById('inventoryForm');
    const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    const inventoryDisplay = document.getElementById('inventoryDisplay');
    
    // Array to store inventory items
    let inventoryItems = [];
    
    // Form submission handler
    inventoryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Validate form
        if (inventoryForm.checkValidity()) {
            // Get form values
            const productName = document.getElementById('productName').value;
            const productDescription = document.getElementById('productDescription').value;
            const productQuantity = parseInt(document.getElementById('productQuantity').value);
            const productPrice = parseFloat(document.getElementById('productPrice').value);
            
            // Create inventory item object
            const inventoryItem = {
                name: productName,
                description: productDescription,
                quantity: productQuantity,
                price: productPrice
            };
            
            // Add to inventory array
            inventoryItems.push(inventoryItem);
            
            // Update the inventory display
            updateInventoryDisplay();
            
            // Show the inventory display if it's hidden
            inventoryDisplay.style.display = 'block';
            
            // Reset form
            inventoryForm.reset();
            inventoryForm.classList.remove('was-validated');
        } else {
            // Add Bootstrap's validation classes
            inventoryForm.classList.add('was-validated');
        }
    }, false);
    
    // Function to update the inventory display
    function updateInventoryDisplay() {
        // Clear existing rows
        inventoryTable.innerHTML = '';
        
        // Add each inventory item to the table
        inventoryItems.forEach(item => {
            const row = inventoryTable.insertRow();
            
            const nameCell = row.insertCell(0);
            nameCell.textContent = item.name;
            
            const descCell = row.insertCell(1);
            descCell.textContent = item.description;
            
            const qtyCell = row.insertCell(2);
            qtyCell.textContent = item.quantity;
            
            const priceCell = row.insertCell(3);
            priceCell.textContent = '$' + item.price.toFixed(2);
        });
    }
    
    // Additional validation for real-time feedback
    document.getElementById('productQuantity').addEventListener('input', function() {
        if (this.validity.rangeUnderflow) {
            this.setCustomValidity('Quantity must be 0 or more');
        } else {
            this.setCustomValidity('');
        }
    });
    
    document.getElementById('productPrice').addEventListener('input', function() {
        if (this.validity.rangeUnderflow) {
            this.setCustomValidity('Price must be 0 or more');
        } else {
            this.setCustomValidity('');
        }
    });
});

// Inside the successful form submission:
const toast = new bootstrap.Toast(document.getElementById('successToast'));
toast.show();



