#!/usr/bin/env node

const { scanProject, detectTechnologies, getCodeWeather } = require("../src");

const project = process.cwd();

const files = scanProject(project);
const technologies = detectTechnologies(project);
const weather = getCodeWeather(project);

console.log("");
console.log("🔬 ARPIT CODE X-RAY");
console.log("");

console.log("FILES");
console.log(`  JavaScript : ${files.javascript}`);
console.log(`  JSON       : ${files.json}`);
console.log(`  Markdown   : ${files.markdown}`);
console.log(`  Other      : ${files.other}`);

console.log("");

console.log("TECHNOLOGIES");

for (const technology of technologies) {
  console.log(`  ✓ ${technology}`);
}

console.log("");

console.log("🌦️ CODE WEATHER");
console.log(`  ${weather.weather}`);
console.log("");

console.log(`  TODOs         : ${weather.todoCount}`);
console.log(`  FIXMEs        : ${weather.fixmeCount}`);
console.log(`  Syntax Errors : ${weather.syntaxErrors}`);

console.log("");
