let closeRules = document.getElementById('close-rules');
let rulesModal = document.getElementById('rules-modal');
let openRules = document.getElementById("open-rules");
openRules.addEventListener("click",(event) =>{
    rulesModal.classList.remove('hidden');
})
    // Close modal when clicking outside the content
rulesModal.addEventListener('click', (event) => {
    if (event.target === rulesModal) {
        rulesModal.classList.add("hidden")
    }
}); 
closeRules.addEventListener('click', function(e){
    rulesModal.classList.add('hidden');
});