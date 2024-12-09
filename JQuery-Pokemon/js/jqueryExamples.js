document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Create and append section header
  const createHeader = (text) => {
    const header = document.createElement("h3");
    header.textContent = text;
    header.className = "my-3";
    return header;
  };

  // Text, HTML, and Val Section
  const textHtmlValSection = document.createElement("div");
  textHtmlValSection.className = "my-3";
  textHtmlValSection.append(createHeader("Text, HTML, and Val"));

  const textHtmlDemo = document.createElement("div");
  textHtmlDemo.className = "p-3 border";
  textHtmlDemo.id = "text-html-demo";

  const textExample = document.createElement("p");
  textExample.id = "text-example";
  textExample.textContent = "This is the text example.";

  const htmlExample = document.createElement("p");
  htmlExample.id = "html-example";
  htmlExample.innerHTML = "This is the <strong>HTML</strong> example.";

  const valInput = document.createElement("input");
  valInput.id = "val-example";
  valInput.type = "text";
  valInput.className = "form-control mb-2";
  valInput.placeholder = "Enter some text";

  const textBtn = document.createElement("button");
  textBtn.id = "text-btn";
  textBtn.className = "btn btn-primary me-2";
  textBtn.textContent = "Change Text";

  const htmlBtn = document.createElement("button");
  htmlBtn.id = "html-btn";
  htmlBtn.className = "btn btn-secondary me-2";
  htmlBtn.textContent = "Change HTML";

  const valBtn = document.createElement("button");
  valBtn.id = "val-btn";
  valBtn.className = "btn btn-success";
  valBtn.textContent = "Get Value";

  textHtmlDemo.append(
    textExample,
    htmlExample,
    valInput,
    textBtn,
    htmlBtn,
    valBtn
  );
  textHtmlValSection.appendChild(textHtmlDemo);
  app.appendChild(textHtmlValSection);

  // Append, Prepend, After, Before Section
  const appendPrependSection = document.createElement("div");
  appendPrependSection.className = "my-3";
  appendPrependSection.append(createHeader("Append, Prepend, After, Before"));

  const addContentDemo = document.createElement("div");
  addContentDemo.className = "p-3 border";
  addContentDemo.id = "add-content-demo";

  const appendExample = document.createElement("p");
  appendExample.id = "append-example";
  appendExample.textContent = "This is the append example.";

  const appendBtn = document.createElement("button");
  appendBtn.id = "append-btn";
  appendBtn.className = "btn btn-primary me-2";
  appendBtn.textContent = "Append";

  const prependBtn = document.createElement("button");
  prependBtn.id = "prepend-btn";
  prependBtn.className = "btn btn-secondary me-2";
  prependBtn.textContent = "Prepend";

  const afterBtn = document.createElement("button");
  afterBtn.id = "after-btn";
  afterBtn.className = "btn btn-success me-2";
  afterBtn.textContent = "Add After";

  const beforeBtn = document.createElement("button");
  beforeBtn.id = "before-btn";
  beforeBtn.className = "btn btn-danger";
  beforeBtn.textContent = "Add Before";

  addContentDemo.append(
    appendExample,
    appendBtn,
    prependBtn,
    afterBtn,
    beforeBtn
  );
  appendPrependSection.appendChild(addContentDemo);
  app.appendChild(appendPrependSection);

  // Remove and Empty Section
  const removeEmptySection = document.createElement("div");
  removeEmptySection.className = "my-3";
  removeEmptySection.append(createHeader("Remove and Empty"));

  const removeDemo = document.createElement("div");
  removeDemo.className = "p-3 border";
  removeDemo.id = "remove-demo";

  const removeElement = document.createElement("div");
  removeElement.id = "remove-element";
  removeElement.className = "mb-2";
  removeElement.textContent = "This element can be removed.";

  const emptyElement = document.createElement("div");
  emptyElement.id = "empty-element";
  emptyElement.className = "mb-2";
  emptyElement.innerHTML =
    "This element can be emptied. <span>Child content</span>";

  const removeBtn = document.createElement("button");
  removeBtn.id = "remove-btn";
  removeBtn.className = "btn btn-primary";
  removeBtn.textContent = "Remove Element";

  const emptyBtn = document.createElement("button");
  emptyBtn.id = "empty-btn";
  emptyBtn.className = "btn btn-secondary";
  emptyBtn.textContent = "Empty Element";

  removeDemo.append(removeElement, emptyElement, removeBtn, emptyBtn);
  removeEmptySection.appendChild(removeDemo);
  app.appendChild(removeEmptySection);

  // CSS and Classes Section
  const cssClassSection = document.createElement("div");
  cssClassSection.className = "my-3";
  cssClassSection.append(createHeader("CSS and Classes"));

  const classDemo = document.createElement("div");
  classDemo.className = "p-3 border";
  classDemo.id = "class-demo";

  const toggleClassExample = document.createElement("p");
  toggleClassExample.id = "toggle-class-example";
  toggleClassExample.className = "mb-2";
  toggleClassExample.textContent = "Click to toggle class highlight.";

  const addClassBtn = document.createElement("button");
  addClassBtn.id = "add-class-btn";
  addClassBtn.className = "btn btn-primary";
  addClassBtn.textContent = "Add Class";

  const removeClassBtn = document.createElement("button");
  removeClassBtn.id = "remove-class-btn";
  removeClassBtn.className = "btn btn-secondary";
  removeClassBtn.textContent = "Remove Class";

  const toggleClassBtn = document.createElement("button");
  toggleClassBtn.id = "toggle-class-btn";
  toggleClassBtn.className = "btn btn-success";
  toggleClassBtn.textContent = "Toggle Class";

  const cssBtn = document.createElement("button");
  cssBtn.id = "css-btn";
  cssBtn.className = "btn btn-danger";
  cssBtn.textContent = "Change CSS";

  const classInfo = document.createElement("p");
  classInfo.id = "class-info";
  classInfo.className = "mt-2";

  classDemo.append(
    toggleClassExample,
    addClassBtn,
    removeClassBtn,
    toggleClassBtn,
    cssBtn,
    classInfo
  );
  cssClassSection.appendChild(classDemo);
  app.appendChild(cssClassSection);

  // Dimensions Section
  const dimensionSection = document.createElement("div");
  dimensionSection.className = "my-3";
  dimensionSection.append(createHeader("Dimensions"));

  const dimensionDemo = document.createElement("div");
  dimensionDemo.className = "p-3 border";
  dimensionDemo.id = "dimension-demo";

  const dimensionBox = document.createElement("div");
  dimensionBox.id = "dimension-box";
  dimensionBox.style.width = "150px";
  dimensionBox.style.height = "150px";
  dimensionBox.style.backgroundColor = "lightblue";

  const dimensionBtn = document.createElement("button");
  dimensionBtn.id = "dimension-btn";
  dimensionBtn.className = "btn btn-primary mt-2";
  dimensionBtn.textContent = "Get Dimensions";

  const dimensionResult = document.createElement("p");
  dimensionResult.id = "dimension-result";

  dimensionDemo.append(dimensionBox, dimensionBtn, dimensionResult);
  dimensionSection.appendChild(dimensionDemo);
  app.appendChild(dimensionSection);

  // DOM Traversal Section
  const traversalSection = document.createElement("div");
  traversalSection.className = "my-3";
  traversalSection.append(createHeader("DOM Traversal"));

  const traversalDemo = document.createElement("div");
  traversalDemo.className = "p-3 border";
  traversalDemo.id = "traversal-demo";

  // Example structure for traversal
  const traversalContainer = document.createElement("div");
  traversalContainer.className = "border p-2";
  traversalContainer.innerHTML = `
    <p>Traversal Example</p>
    <ul id="traversal-list">
        <li class="item">Item 1</li>
        <li class="item">Item 2</li>
        <li class="item">Item 3</li>
        <li class="item">Item 4</li>
        <li class="item">Item 5</li>
    </ul>
`;

  // Buttons for Traversal Methods
  const parentBtn = document.createElement("button");
  parentBtn.className = "btn btn-primary me-2";
  parentBtn.textContent = "Parent";
  parentBtn.onclick = () =>
    alert($("#traversal-list").parent().prop("nodeName"));

  const parentsBtn = document.createElement("button");
  parentsBtn.className = "btn btn-secondary me-2";
  parentsBtn.textContent = "Parents";
  parentsBtn.onclick = () =>
    alert(
      $("#traversal-list")
        .parents()
        .map(function () {
          return this.nodeName;
        })
        .get()
        .join(", ")
    );

  const parentsUntilBtn = document.createElement("button");
  parentsUntilBtn.className = "btn btn-success me-2";
  parentsUntilBtn.textContent = "Parents Until";
  parentsUntilBtn.onclick = () =>
    alert(
      $("#traversal-list")
        .parentsUntil("body")
        .map(function () {
          return this.nodeName;
        })
        .get()
        .join(", ")
    );

  const childrenBtn = document.createElement("button");
  childrenBtn.className = "btn btn-primary me-2";
  childrenBtn.textContent = "Children";
  childrenBtn.onclick = () =>
    alert(
      $("#traversal-list")
        .children()
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  const findBtn = document.createElement("button");
  findBtn.className = "btn btn-secondary me-2";
  findBtn.textContent = "Find";
  findBtn.onclick = () =>
    alert(
      $("#traversal-list")
        .find(".item")
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  const siblingsBtn = document.createElement("button");
  siblingsBtn.className = "btn btn-danger me-2";
  siblingsBtn.textContent = "Siblings";
  siblingsBtn.onclick = () =>
    alert(
      $(".item:first")
        .siblings()
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn btn-primary me-2";
  nextBtn.textContent = "Next";
  nextBtn.onclick = () => alert($(".item:first").next().text());

  const nextAllBtn = document.createElement("button");
  nextAllBtn.className = "btn btn-secondary me-2";
  nextAllBtn.textContent = "Next All";
  nextAllBtn.onclick = () =>
    alert(
      $(".item:first")
        .nextAll()
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  const nextUntilBtn = document.createElement("button");
  nextUntilBtn.className = "btn btn-success me-2";
  nextUntilBtn.textContent = "Next Until";
  nextUntilBtn.onclick = () =>
    alert(
      $(".item:first")
        .nextUntil(".item:last")
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  const prevBtn = document.createElement("button");
  prevBtn.className = "btn btn-danger me-2";
  prevBtn.textContent = "Prev";
  prevBtn.onclick = () => alert($(".item:last").prev().text());

  const prevAllBtn = document.createElement("button");
  prevAllBtn.className = "btn btn-primary me-2";
  prevAllBtn.textContent = "Prev All";
  prevAllBtn.onclick = () =>
    alert(
      $(".item:last")
        .prevAll()
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  const prevUntilBtn = document.createElement("button");
  prevUntilBtn.className = "btn btn-secondary me-2";
  prevUntilBtn.textContent = "Prev Until";
  prevUntilBtn.onclick = () =>
    alert(
      $(".item:last")
        .prevUntil(".item:first")
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  const firstBtn = document.createElement("button");
  firstBtn.className = "btn btn-primary me-2";
  firstBtn.textContent = "First";
  firstBtn.onclick = () => alert($("#traversal-list .item").first().text());

  const lastBtn = document.createElement("button");
  lastBtn.className = "btn btn-secondary me-2";
  lastBtn.textContent = "Last";
  lastBtn.onclick = () => alert($("#traversal-list .item").last().text());

  const eqBtn = document.createElement("button");
  eqBtn.className = "btn btn-success me-2";
  eqBtn.textContent = "EQ (Index 2)";
  eqBtn.onclick = () => alert($("#traversal-list .item").eq(2).text());

  const filterBtn = document.createElement("button");
  filterBtn.className = "btn btn-danger me-2";
  filterBtn.textContent = "Filter (Odd)";
  filterBtn.onclick = () =>
    alert(
      $("#traversal-list .item")
        .filter(":odd")
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  const notBtn = document.createElement("button");
  notBtn.className = "btn btn-primary me-2";
  notBtn.textContent = "Not (Even)";
  notBtn.onclick = () =>
    alert(
      $("#traversal-list .item")
        .not(":even")
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ")
    );

  // Append everything
  traversalDemo.append(
    traversalContainer,
    parentBtn,
    parentsBtn,
    parentsUntilBtn,
    childrenBtn,
    findBtn,
    siblingsBtn,
    nextBtn,
    nextAllBtn,
    nextUntilBtn,
    prevBtn,
    prevAllBtn,
    prevUntilBtn,
    firstBtn,
    lastBtn,
    eqBtn,
    filterBtn,
    notBtn
  );
  traversalSection.appendChild(traversalDemo);
  app.appendChild(traversalSection);
});
