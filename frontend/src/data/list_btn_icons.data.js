import { GrEdit } from 'react-icons/gr'
import {
	PiEyeSlashFill,
	PiEyeFill,
	PiPlugsConnected,
	PiPlugsLight,
} from 'react-icons/pi'
import {
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
	AiOutlineLeft,
	AiOutlineRight,
} from 'react-icons/ai'
import {
	LiaSortAlphaDownSolid,
	LiaSortAlphaDownAltSolid,
} from 'react-icons/lia'

export const listBtnIcons = {
	edit: <GrEdit />,
	enable: <PiEyeFill />,
	disable: <PiEyeSlashFill />,
	previous: <AiOutlineLeft />,
	next: <AiOutlineRight />,
	first: <AiOutlineDoubleLeft />,
	last: <AiOutlineDoubleRight />,
	'a/z': <LiaSortAlphaDownSolid />,
	'z/a': <LiaSortAlphaDownAltSolid />,
	connected: <PiPlugsConnected />,
	disconnected: <PiPlugsLight />,
}
