function skillsMember() {
  const member = document.querySelector('.member');

  if (member) {
    const skills = member.querySelector('.skills');
    const skillsList = skills.querySelector('ul');
    const skillsItems = skillsList.querySelectorAll('li');
    const skillsItemsLength = skillsItems.length;
    const skillsItemsWidth = 100 / skillsItemsLength;

    skillsItems.forEach((item) => {
      item.style.width = `${skillsItemsWidth}%`;
    });
  }
}