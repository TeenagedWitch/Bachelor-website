import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import classes from "./AboutUs.module.css";

interface Person {
  Name: string;
  Position: string;
  Job?: string;
  Links: string[];
}

const AboutUs: React.FC = () => {
  const ABOUT_US_DATA = [
    {
      Name: "Zaza GamezardaShvili",
      Position: "Caucasus University Computer Science Professor ",
      Links: ["https://www.linkedin.com/in/zaza-gamezardashvili-2b246173/"],
    },
    {
      Name: "Luka Iadze",
      Position: "Caucasus University Bachelor Student ",
      Job: "React Developer",
      Links: [
        "https://www.linkedin.com/in/luka-iadze-0234bb217/",
        "https://github.com/TeenagedWitch",
      ],
    },
  ];

  return (
    <div className={classes.aboutUs}>
      {ABOUT_US_DATA.map((person: Person, personIndex: number) => (
        <div className={classes.personContainer} key={personIndex}>
          <h2>{person.Name}</h2>
          <p>{person.Position}</p>
          {person.Job && <p>{person.Job}</p>}
          <div>
            {person.Links.map((link, index: number) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: 10 }}
              >
                {index === 0 ? <LinkedInIcon /> : <GitHubIcon />}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
