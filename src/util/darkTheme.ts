export const dark_theme_state = () => {
	const body_el = document.body
	const body_classList = body_el.classList
	const ishave = body_classList.contains('dark')
	ishave ? body_classList.remove('dark') : body_classList.add('dark')
}
