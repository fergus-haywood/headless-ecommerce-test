
export default {
  name: "homepage",
  title: "Homepage",
  type: "document",

  __experimental_actions: ["update", "create", "publish"],

  fields: [
    {
      title: "Hero Title",
      description:
        "This title will appear in the hero unit at the top of the page",
      type: "string",
      name: "heroTitle",
    },
  ],
};