import { Answer } from "../types/types";

const aggregateAnswers = (type: string, items: Answer[]) => {
  if (type === "text" || type === "paragraph") {
    const frequencies: Record<string, number> = {};
    items.forEach((item) => {
      const answer = item.answer as string;
      frequencies[answer] = (frequencies[answer] || 0) + 1;
    });
    const sortedFrequencies = Object.entries(frequencies)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    return sortedFrequencies
      .map(([answer, count]) => `${answer} (${count})`)
      .join(", ");
  }

  if (type === "number") {
    const numbers = items.map((item) => Number(item.answer));
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const avg = (
      numbers.reduce((acc, num) => acc + num, 0) / numbers.length
    ).toFixed(0);
    return `Most Common: ${
      numbers.sort(
        (a, b) =>
          numbers.filter((num) => num === b).length -
          numbers.filter((num) => num === a).length
      )[0]
    }, Range: ${min}-${max}, Average: ${avg}`;
  }

  if (type === "checkbox") {
    const yesCount = items.filter((item) => item.answer === "true").length;
    const noCount = items.filter((item) => item.answer === "false").length;
    const total = yesCount + noCount;
    const yesPercentage = ((yesCount / total) * 100).toFixed(2);
    const noPercentage = ((noCount / total) * 100).toFixed(2);
    return `Yes: ${yesPercentage}% (${yesCount}), No: ${noPercentage}% (${noCount})`;
  }

  return "";
};

export default aggregateAnswers;
