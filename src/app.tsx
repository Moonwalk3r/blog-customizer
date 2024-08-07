import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from './components/article-params-form';
import { Article } from './components/article';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [nowArticleState, setNowArticleState] = useState(defaultArticleState);
	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': nowArticleState.fontFamilyOption.value,
					'--font-size': nowArticleState.fontSizeOption.value,
					'--font-color': nowArticleState.fontColor.value,
					'--container-width': nowArticleState.contentWidth.value,
					'--bg-color': nowArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				propertys={nowArticleState}
				setPropertys={setNowArticleState}
			/>
			<Article />
		</div>
	);
};