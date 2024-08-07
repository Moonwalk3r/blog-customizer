import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useClose } from '../select/hooks/useClose';

export type ArticleParamsFormProps = {
	propertys: ArticleStateType;
	setPropertys: (propertys: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	propertys,
	setPropertys,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [changeFontFamilyOption, setChangeFontFamilyOption] = useState(
		propertys.fontFamilyOption
	);
	const [changeFontSizeOption, setchangeFontSizeOption] = useState(
		propertys.fontSizeOption
	);
	const [changeFontColor, setChangeFontColor] = useState(propertys.fontColor);
	const [changeBackgroundColor, setChangeBackgroundColor] = useState(
		propertys.backgroundColor
	);
	const [changeContentWidth, setChangeContentWidth] = useState(
		propertys.contentWidth
	);

	const toggleForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const update = () => {
		event?.preventDefault();
		setPropertys({
			fontFamilyOption: changeFontFamilyOption,
			fontSizeOption: changeFontSizeOption,
			fontColor: changeFontColor,
			backgroundColor: changeBackgroundColor,
			contentWidth: changeContentWidth,
		});
	};
	const reset = () => {
		setPropertys(defaultArticleState);
		setChangeFontFamilyOption(defaultArticleState.fontFamilyOption);
		setchangeFontSizeOption(defaultArticleState.fontSizeOption);
		setChangeFontColor(defaultArticleState.fontColor);
		setChangeBackgroundColor(defaultArticleState.backgroundColor);
		setChangeContentWidth(defaultArticleState.contentWidth);
	};

	const ref = useRef<HTMLDivElement | null>(null);

	function closeMenu(): void {
		setIsMenuOpen(false);
	}

	useClose({
		isOpen: isMenuOpen,
		onClose: closeMenu,
		rootRef: ref,
	});

	return (
		<div ref={ref}>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={update}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={changeFontFamilyOption}
						onChange={setChangeFontFamilyOption}
						title='Шрифт'
					/>
					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={changeFontSizeOption}
						onChange={setchangeFontSizeOption}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={changeFontColor}
						onChange={setChangeFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={changeBackgroundColor}
						onChange={setChangeBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={changeContentWidth}
						title='Ширина контента'
						onChange={setChangeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={reset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};