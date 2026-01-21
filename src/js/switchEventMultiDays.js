// Sélectionnez toutes les cases à cocher avec la classe 'maClasse'
const checkboxes = document.querySelectorAll('.switch-multi-days')

// Ajoutez un gestionnaire d'événements "change" à chaque case à cocher
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    // Vérifiez si la case à cocher actuelle est cochée ou décochée
    const isChecked = this.checked

    // Parcourez toutes les cases à cocher de la même classe
    checkboxes.forEach(otherCheckbox => {
      // Assurez-vous de ne pas décocher la case actuelle
      if (otherCheckbox !== this) {
        // Cochez ou décochez les autres cases en fonction de l'état de la case actuelle
        otherCheckbox.checked = isChecked
      }
    })
  })
})
