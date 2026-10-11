const courseListView = document.querySelector('.courses-list-view');
const termDropdown = document.querySelector('.term-filter');

renderCourseListView();

async function fetchCourses() {
  try {
    const response = await fetch('/api/courses');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    return new Promise(resolve => {
      resolve(data);
    });

  } catch (error) {
    console.log(`Fetch error: ${error}`);
  }
}

async function renderCourseListView() {
  const data = await fetchCourses();

  data.forEach(course => {
    courseListView.innerHTML += `
      <div class="course-list-card">
        <span class="course-term">${course.term}</span>
        <div class="course-title">
          <span>${course.name}</span>
          <span class="grade-pill">${course.grade} %</span>
        </div>
        <div class="course-subtitle">
          <span>${course.assignments} graded items</span>
          <span>Modified yesterday</span>
        </div>
      </div>
    `;
  })
}