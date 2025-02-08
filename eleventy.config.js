import 'dotenv/config'
import { EleventyHtmlBasePlugin } from '@11ty/eleventy'

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./public/fonts/')
  eleventyConfig.addPassthroughCopy('./public/images/')
  eleventyConfig.addPassthroughCopy('./public/**/*.{css,js}')

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)

  eleventyConfig.addFilter('i18n', function (key, lang) {
    lang ??= this.ctx.lang

    if (this.ctx.i18n.hasOwnProperty(lang)) {
      const translations = this.ctx.i18n[lang]

      if (translations.hasOwnProperty(key)) {
        return translations[key]
      }
    }

    return key
  })
}

/** @param {import("@11ty/eleventy").UserConfig} config */
export const config = {
  pathPrefix: process.env.PATH_PREFIX,
  dir: {
    input: 'public',
  },
}
