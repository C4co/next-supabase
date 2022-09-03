import { render, screen } from '@testing-library/react'
import { Welcome } from './welcome'

describe('<Welcome /> component', () => {
  test('Check initial render', () => {
    render(<Welcome />)

    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('description')).toBeInTheDocument()
    expect(screen.getByTestId('version')).toBeInTheDocument()
  })
})
