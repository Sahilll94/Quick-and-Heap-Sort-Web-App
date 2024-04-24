// Function to sort the array based on the selected algorithm
function sortArray() {
  const inputArray = document.getElementById('inputArray').value.trim(); // Get input array string
  const sortType = document.getElementById('sortType').value; // Get selected sorting algorithm
  let numbers = inputArray.split(',').map(num => parseInt(num)); // Convert input string to array of numbers

  // Check if input is valid and not empty
  if (inputArray === '' || numbers.some(isNaN)) {
    alert('Please enter valid numbers separated by commas.');
    return;
  }

  // Check if the array is already sorted
  const isSorted = checkSorted(numbers);
  if (isSorted) {
    alert('Array is already sorted.');
    return;
  }

  // Call the appropriate sorting algorithm function
  let sortedNumbers;
  if (sortType === 'heapSort') {
    sortedNumbers = heapSort(numbers);
  } else if (sortType === 'quickSort') {
    sortedNumbers = quickSort(numbers);
  }

  // Display the sorted array
  document.getElementById('sortedArray').innerText = `Sorted Array: [${sortedNumbers.join(', ')}]`;
}

// Function to check if the array is already sorted
function checkSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false; // Array is not sorted
    }
  }
  return true; // Array is sorted
}

// Heap Sort Algorithm
function heapSort(arr) {
  // Heapify the array
  function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i);
  }

  // Heap sort
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

// Quick Sort Algorithm
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
