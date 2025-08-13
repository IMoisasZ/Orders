import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Container from '../container/Container'
import Checkbox from '../checkbox/Checkbox'

jest.mock('./Container.module.css', () => ({
	container: 'container-class',
	fluid: 'fluid-class',
}))

describe('Container Component', () => {
	/**@description -> Test 1: Render by prop children. */
	test(`Must rendering elements through the prop "children".`, () => {
		render(
			<Container>
				<Checkbox
					name='checkbox1'
					labelName='Children on container'
				/>
			</Container>
		)
		const checkboxElement = screen.getByRole('checkbox', {
			name: 'Children on container',
		})
		expect(checkboxElement).toBeInTheDocument()
	})

	/**@description -> Test 2: Render with prop style.  */
	test(`Must put the styles of container like it is passed by prop "style"`, () => {
		const styleContainer = {
			backgroundColor: '#c1c1c1',
			color: '#000',
			fontSize: '46px',
		}
		const textContainer = 'Alter the backgroundColor of container'
		render(<Container style={styleContainer}>{textContainer}</Container>)

		const containerElement = screen.getByTestId('container-component')

		expect(containerElement).toHaveStyle(styleContainer)
	})

	/**@description -> Test 3: Render with prop className container. */
	test(`Must rendering the element using the prop "classname" default = ".container"`, () => {
		const textContainer = `Alter the container using the prop className .container`
		render(<Container>{textContainer}</Container>)
		const containerElement = screen.getByTestId('container-component')

		expect(containerElement).toHaveClass('container-class')
		expect(containerElement).not.toHaveClass('container')
	})

	/**@description -> Test 4: Render showing the title of page. */
	test(`Must rendering the component showing the title of page.`, () => {
		const titlePage = 'Title of page'

		render(<Container titlePage={titlePage}></Container>)
		const containerElement = screen.getByRole('heading', {
			name: titlePage,
			level: 1,
		})
		expect(containerElement).toBeInTheDocument()
	})

	/**@description -> Test 5: render with the className fluid. */
	test(`Must rendering the component with the prop className with "fluid"`, () => {
		const textContainer = `Container fluid`
		render(<Container className='fluid'>{textContainer}</Container>)
		const containerElement = screen.getByTestId('container-component')

		expect(containerElement).toHaveClass('container-class')

		expect(containerElement).toHaveClass('fluid')
	})
})
