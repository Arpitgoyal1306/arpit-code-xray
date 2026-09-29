const fs = require("fs");
const path = require("path");

function scanProject(directory) {
  const result = {
    javascript: 0,
    json: 0,
    markdown: 0,
    other: 0,
  };

  function scanFolder(folder) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
      const filePath = path.join(folder, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        if (file === "node_modules" || file === ".git") {
          continue;
        }

        scanFolder(filePath);
      } else {
        const extension = path.extname(file);

        if (extension === ".js") {
          result.javascript++;
        } else if (extension === ".json") {
          result.json++;
        } else if (extension === ".md") {
          result.markdown++;
        } else {
          result.other++;
        }
      }
    }
  }

  scanFolder(directory);

  return result;
}

function detectTechnologies(directory) {
    const technologies = [];

    const packagePath = path.join(directory, "package.json");

    if (!fs.existsSync(packagePath)) {
        return technologies;
    }

    const packageJson = JSON.parse(
        fs.readFileSync(packagePath, "utf-8")
    );

    const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
    };

    if (dependencies.express) {
        technologies.push("Express");
    }

    if (dependencies.react) {
        technologies.push("React");
    }

    if (dependencies.next) {
        technologies.push("Next.js");
    }

    if (dependencies.prisma) {
        technologies.push("Prisma");
    }

    if (technologies.length === 0) {
        technologies.push("Node.js");
    }

    return technologies;
}

function getCodeWeather(directory) {
  let todoCount = 0;
  let fixmeCount = 0;

  function scanFolder(folder) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
      const filePath = path.join(folder, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        if (file === "node_modules" || file === ".git") {
          continue;
        }

        scanFolder(filePath);
      } else {
        const extension = path.extname(file);

        if (extension !== ".js") {
          continue;
        }

        const content = fs.readFileSync(filePath, "utf-8");

        todoCount += (content.match(/\/\/.*TODO/g) || []).length;
        fixmeCount += (content.match(/\/\/.*FIXME/g) || []).length;
      }
    }
  }

  scanFolder(directory);

  const totalIssues = todoCount + fixmeCount;

  let weather;

  if (totalIssues === 0) {
    weather = "☀️ Clear";
  } else if (totalIssues <= 5) {
    weather = "🌤️ Mild";
  } else if (totalIssues <= 10) {
    weather = "☁️ Cloudy";
  } else {
    weather = "🌧️ Rainy";
  }

  return {
    todoCount,
    fixmeCount,
    weather,
  };
}

module.exports = {
    scanProject,
    detectTechnologies,
    getCodeWeather
};