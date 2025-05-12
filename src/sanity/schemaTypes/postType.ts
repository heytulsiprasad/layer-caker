import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: ["content", "settings"],
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required().error(`I said required`),
      group: "content",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
      group: "content",
    }),
    defineField({
      name: "writingSeason",
      type: "string",
      options: {
        list: ["spring", "summer", "autumn", "winter"],
        layout: "radio",
      },
      group: "settings",
    }),
    defineField({
      name: "writingMonth",
      type: "string",
      options: {
        list: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        layout: "dropdown",
      },
      group: "settings",
      validation: (rule) => {
        return rule.custom((value, context) => {
          if (value) {
            const seasonsWithMonths = {
              spring: ["March", "April", "May"],
              summer: ["June", "July", "August"],
              autumn: ["September", "October", "November"],
              winter: ["December", "January", "February"],
            };

            const season = context.document?.writingSeason;
            if (
              season &&
              !seasonsWithMonths[
                season as keyof typeof seasonsWithMonths
              ].includes(value)
            ) {
              return "Invalid month for the selected season";
            }
          }

          return true;
        });
      },
      hidden: ({ document }) => !document?.writingSeason,
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "content",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          group: "settings",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context?.parent as { asset?: { _ref?: string } };

              return !value && parent?.asset?._ref
                ? "Alt text is required when an image is present"
                : true;
            }),
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "relatedPosts",
      type: "array",
      of: [{ type: "reference", to: { type: "post" } }],
      group: "content",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
