const fs = require("node:fs/promises");

const currentDate = new Date();
const birthday = new Date("1998-11-12");

function daysRemainingBeforeNextBirthdayCalculation() {
  const NextBirthday = new Date(
    currentDate.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );

  if (currentDate > NextBirthday) {
    NextBirthday.setFullYear(currentDate.getFullYear() + 1);
  }

  const daysDifference = Math.ceil(
    (NextBirthday - currentDate) / (1000 * 60 * 60 * 24)
  );

  return daysDifference;
}

function ageCalculation() {
  let age = currentDate.getFullYear() - birthday.getFullYear();

  if (
    currentDate.getMonth() < birthday.getMonth() ||
    (currentDate.getMonth() === birthday.getMonth() &&
      currentDate.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
}

function selectOneAdjecitve() {
  const adjectives = [
    "fantastic",
    "terrific",
    "extraordinary",
    "amazing",
    "fabulous",
    "incredible",
    "dazzling",
    "awesome",
    "exceptional",
    "impressive",
  ];

  const randomIndex = Math.floor(Math.random() * adjectives.length);
  const adjective = adjectives[randomIndex];
  return adjective;
}

async function udpateReadme() {
  try {
    let readmeData = await fs.readFile("./README_template.md", "utf-8");
    const daysRemainingBeforeNextBirthday =
      daysRemainingBeforeNextBirthdayCalculation();
    const age = ageCalculation();
    const oneAdjective = selectOneAdjecitve();

    readmeData = readmeData.replace("{{age}}", age);

    if (
      currentDate.getMonth() === birthday.getMonth() &&
      currentDate.getDate() == birthday.getDate()
    ) {
      readmeData = readmeData.replace(
        "{{days_remaining_before_next_birthday}}",
        `🎊 It's my birthday today! 🎉`
      );
    } else {
      readmeData = readmeData.replace(
        "{{days_remaining_before_next_birthday}}",
        `⏳ next birthday in ${daysRemainingBeforeNextBirthday} day${
          daysRemainingBeforeNextBirthday === 1 ? "" : "s"
        } ⌛️`
      );
    }

    readmeData = readmeData.replace(
      "{{readme_update_date}}",
      `${currentDate.toLocaleDateString()}`
    );

    readmeData = readmeData.replace("{{bot_adjective}}", oneAdjective);

    await fs.writeFile("./README.md", readmeData, "utf-8");
  } catch (error) {
    console.error(error);
  }
}

udpateReadme();
