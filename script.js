// Function to sort the array based on the selected algorithm
async function sortArray() {
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

  // Clear previous visualization and time complexity info
  const visualizationDiv = document.getElementById('visualization');
  visualizationDiv.innerHTML = '';
  document.getElementById('timeComplexity').innerText = '';

  // Call the appropriate sorting algorithm function with visualization
  let sortedNumbers, timeComplexity;
  if (sortType === 'heapSort') {
    sortedNumbers = await visualizeSort(heapSort, numbers, visualizationDiv);
    timeComplexity = 'Worst Case: O(n log n), Best Case: O(n log n), Average Case: O(n log n)';
  } else if (sortType === 'quickSort') {
    sortedNumbers = await visualizeSort(quickSort, numbers, visualizationDiv);
    timeComplexity = 'Worst Case: O(n^2), Best Case: O(n log n), Average Case: O(n log n)';
  }

  // Display the sorted array and time complexity info
  document.getElementById('sortedArray').innerText = `Sorted Array: [${sortedNumbers.join(', ')}]`;
  document.getElementById('timeComplexity').innerText = `Time Complexity: ${timeComplexity}`;
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

// Function to visually show the sorting process
async function visualizeSort(sortAlgorithm, arr, container) {
  const delay = 1000; // Delay in milliseconds between steps

  // Visualize the initial array state
  visualizeArray(arr, container);

  // Perform sorting algorithm with visualization
  await sortAlgorithm(arr, container, delay);

  return arr;
}

// Function to visualize the array as bars with element values
function visualizeArray(arr, container) {
  arr.forEach((num, index) => {
    const barContainer = document.createElement('div');
    barContainer.className = 'bar-container';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${num * 10}px`; // Adjust height for visualization

    const label = document.createElement('div');
    label.className = 'label';
    label.innerText = num; // Display element value as text

    bar.appendChild(label); // Add label inside the bar
    barContainer.appendChild(bar);
    container.appendChild(barContainer);
  });
}

// Heap Sort Algorithm with visualization
async function heapSort(arr, container, delay) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, container, delay);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    await heapify(arr, i, 0, container, delay);
  }
}

async function heapify(arr, n, i, container, delay) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    await animateSwap(container.children, i, largest, delay);
    await heapify(arr, n, largest, container, delay);
  }
}

async function animateSwap(elements, index1, index2, delay) {
  await new Promise(resolve => setTimeout(resolve, delay)); // Delay for visualization
  const tempHeight = elements[index1].children[0].style.height;
  elements[index1].children[0].style.height = elements[index2].children[0].style.height;
  elements[index2].children[0].style.height = tempHeight;
}

// Quick Sort Algorithm with visualization
async function quickSort(arr, container, delay) {
  async function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        await animateSwap(container.children, i, j, delay);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await animateSwap(container.children, i + 1, high, delay);

    return i + 1;
  }

  async function quick(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      await quick(low, pi - 1);
      await quick(pi + 1, high);
    }
  }

  await quick(0, arr.length - 1);
}
