/**
 * Hides the current section and displays the next section.
 *
 * @param {string} currentSectionId ID of the current section
 * @param {string} nextSectionId ID of the next section
 */
function showNextSection(currentSectionId, nextSectionId) {
  document.getElementById(currentSectionId).style.display = "none";
  document.getElementById(nextSectionId).style.display = "block";
}
