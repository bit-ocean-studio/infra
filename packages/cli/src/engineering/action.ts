import prompts from 'prompts'

export const engineering = async () => {
  const response = await prompts({
    type: 'text',
    name: 'value',
    message: 'What is your name?'
  })
  return response
}
