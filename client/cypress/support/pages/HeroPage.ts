class HeroPage {
  get selectors() {
    return {
      loginButton: 'nav',
      emailField: "[name='email']",
      passwordField: "[name='password']",
      signinButton: '.text-white',
      createHeroButton: '.bg-blue-700',
      invalidAlert: '.text-red-500',

      nameInput: '[data-cy="nameInput"]',
      priceInput: '[data-cy="priceInput"]',
      saveButton: 'button[type="submit"]'
    };
  }

  accessLoginPage(): void {
    cy.visit('/heroes');
  }

  loginWithCredentials(email: string, pass: string): void {
    cy.get(this.selectors.loginButton).click();
    if (email) cy.get(this.selectors.emailField).type(email);
    if (pass) cy.get(this.selectors.passwordField).type(pass);
    cy.get(this.selectors.signinButton).click();
  }

  abrirNovoHeroi(): void {
    cy.get(this.selectors.createHeroButton).contains('Create New Hero').click();
  }

  cadastrarHeroi(nome: string, preco: string, fans: string = '10', saves: string = '5'): void {
    if (nome) cy.get(this.selectors.nameInput).clear().type(nome);
    if (preco) cy.get(this.selectors.priceInput).clear().type(preco);
    
    cy.get('input[name="fans"]').clear().type(fans);
    cy.get('input[name="saves"]').clear().type(saves);
    
    cy.get('select[name="powers"]').select('Flying');

    cy.contains('button', 'Submit').click();
  }
}

export default new HeroPage();