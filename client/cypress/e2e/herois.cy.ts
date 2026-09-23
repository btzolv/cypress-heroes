import heroPage from '../support/pages/HeroPage';

describe('Suíte de Testes Cypress Heroes - herois.cy.ts', () => {
  beforeEach(() => {
    heroPage.accessLoginPage();
  });

  it('1️⃣ Login com usuário válido', () => {
    heroPage.loginWithCredentials('admin@test.com', 'test123');
    cy.get(heroPage.selectors.createHeroButton)
      .contains('Create New Hero')
      .should('be.visible');
  });

  it('2️⃣ Login inválido', () => {
    heroPage.loginWithCredentials('oi@test.com', 'test123');
    cy.get(heroPage.selectors.invalidAlert)
      .should('contain', 'Invalid email or password');
  });

  it('Login com campos obrigatórios em branco', () => {
    cy.get(heroPage.selectors.loginButton).click();
    cy.get(heroPage.selectors.emailField).click();
    cy.get(heroPage.selectors.passwordField).click();
    cy.get(heroPage.selectors.signinButton).click();

    cy.get(heroPage.selectors.invalidAlert).eq(0).should('contain', 'Email is required');
    cy.get(heroPage.selectors.invalidAlert).eq(1).should('contain', 'Password is required');
  });

  it('4️⃣ Criar novo herói com sucesso', () => {
    heroPage.loginWithCredentials('admin@test.com', 'test123');
    heroPage.abrirNovoHeroi();

    const nomeHeroi = `Heroi_${Date.now()}`;
    const precoHeroi = '100';

    heroPage.cadastrarHeroi(nomeHeroi, precoHeroi, '50', '20');

    cy.contains(nomeHeroi).should('be.visible');
  });
});