import { useParams, useNavigate } from 'react-router-dom';

const errorMessages = {
    404: {
        title: 'Página não encontrada',
        description: 'A página que você tentou acessar não existe ou foi removida.'
    },
    403: {
        title: 'Acesso negado',
        description: 'Você não tem permissão para acessar esta página.'
    },
    401: {
        title: 'Não autenticado',
        description: 'Você precisa fazer login para acessar esta página.'
    },
    500: {
        title: 'Erro interno do servidor',
        description: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
    }
};

export default function ErrorPage({ errorCode: propCode, title: propTitle, description: propDesc }) {
    const { code } = useParams();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    const resolvedCode = propCode || code || 404;
    const error = errorMessages[resolvedCode] || {
        title: propTitle || 'Erro desconhecido',
        description: propDesc || 'Algo inesperado aconteceu.'
    };

    const title = propTitle || error.title;
    const description = propDesc || error.description;

    const colorMap = {
        404: '#4F732C',
        403: '#dc3545',
        401: '#fd7e14',
        500: '#6c757d'
    };

    const color = colorMap[resolvedCode] || '#4F732C';
    const destination = currentUser ? '/dashboard' : '/';
    const destinationLabel = currentUser ? 'Ir para o Dashboard' : 'Voltar para a Home';

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '80vh' }}
        >
            <div className="text-center px-4">
                <div
                    style={{
                        fontSize: 'clamp(6rem, 20vw, 12rem)',
                        fontWeight: '900',
                        lineHeight: 1,
                        color,
                        opacity: 0.15,
                        userSelect: 'none',
                        letterSpacing: '-0.05em'
                    }}
                >
                    {resolvedCode}
                </div>

                <div style={{ marginTop: '-2rem' }}>
                    <h1
                        className="fw-bold mb-3"
                        style={{ color, fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
                    >
                        {title}
                    </h1>
                    <p className="text-muted mb-4" style={{ maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                        {description}
                    </p>
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(-1)}
                        >
                            ← Voltar
                        </button>
                        <button
                            className="btn text-white"
                            style={{ backgroundColor: color, borderColor: color }}
                            onClick={() => navigate(destination)}
                        >
                            {destinationLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
