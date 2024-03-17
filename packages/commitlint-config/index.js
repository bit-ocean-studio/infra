import fs from 'node:fs'
import path from 'node:path'

const appsDir = path.resolve(process.cwd(), 'apps')
const packagesDir = path.resolve(process.cwd(), 'packages')

let apps = []
let packages = []

if (fs.existsSync(appsDir)) {
  apps = fs.readdirSync(appsDir)
}
if (fs.existsSync(packagesDir)) {
  packages = fs.readdirSync(packagesDir)
}

/** @type {import('cz-git').UserConfig} */
export default {
  extends: '@commitlint/config-conventional',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'deps',
        'docs',
        'feat',
        'fix',
        'i18n',
        'perf',
        'refactor',
        'release',
        'revert',
        'style',
        'test'
      ]
    ]
  },
  prompt: {
    alias: {
      fd: 'docs: fix typos'
    },
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联 Issue 前缀（可选）:',
      customFooterPrefix: '输入自定义 Issue 前缀 :',
      footer: '列举关联 Issue (可选) 例如: #1, #2 :\n',
      confirmCommit: '是否提交或修改 Commit ?'
    },
    types: [
      {
        value: 'feat',
        name: 'feat:      ✨ 新增功能 | A new feature.',
        emoji: ':sparkles:'
      },
      {
        value: 'fix',
        name: 'fix:       🐛 修复缺陷 | A bug fix.',
        emoji: ':bug:'
      },
      {
        value: 'refactor',
        name: 'refactor:  ♻️  代码重构 | A code change that neither fixes a bug nor adds a feature.',
        emoji: ':recycle:'
      },
      {
        value: 'style',
        name: 'style:     💄 代码格式 | Changes that do not affect the meaning of the code.',
        emoji: ':lipstick:'
      },
      {
        value: 'docs',
        name: 'docs:      📝 文档更新 | Documentation only changes.',
        emoji: ':memo:'
      },
      {
        value: 'test',
        name: 'test:      ✅ 测试相关 | Adding missing tests or correcting existing tests.',
        emoji: ':white_check_mark:'
      },
      {
        value: 'perf',
        name: 'perf:      ⚡️ 性能提升 | A code change that improves performance.',
        emoji: ':zap:'
      },
      {
        value: 'i18n',
        name: 'i18n:      🌐 翻译更新 | Internationalization only changes.',
        emoji: ':globe_with_meridians:'
      },
      {
        value: 'revert',
        name: 'revert:    ⏪️ 回退代码 | Revert to a commit.',
        emoji: ':rewind:'
      },
      {
        value: 'build',
        name: 'build:     📦️ 构建相关 | Changes that affect the build system or external dependencies.',
        emoji: ':package:'
      },
      {
        value: 'ci',
        name: 'ci:        🎡 持续集成 | Changes to our CI configuration files and scripts.',
        emoji: ':ferris_wheel:'
      },
      {
        value: 'release',
        name: 'release:   🏷️  发布版本 | Release a new version.',
        emoji: ':bookmark:'
      },
      {
        value: 'deps',
        name: 'deps:      🚀 依赖升级 | Dependencies upgrades.',
        emoji: ':rocket:'
      },
      {
        value: 'chore',
        name: 'chore:     🔨 其他修改 | Other changes that do not modify src or test files.',
        emoji: ':hammer:'
      }
    ],
    useEmoji: true,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [...apps, ...packages],
    enableMultipleScopes: true,
    scopeEnumSeparator: ',',
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}