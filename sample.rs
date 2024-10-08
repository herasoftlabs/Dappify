############ INSTRUCTIONS ############

Örnek Uygulama 1: Kullanıcı Profili Oluşturma

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: create_user_profile
        Açıklama: Yeni bir kullanıcı profili oluşturur.
        Parametreler:
            username (String, maksimum uzunluk 32 karakter)
            bio (String, maksimum uzunluk 256 karakter)

    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: user
            Tipi: Signer (AccountInfo)
            Attribute'lar: mut, signer
            Constraint'ler: Yok

        Hesap 2:

            Adı: profile_account
            Tipi: Account (UserProfile)
            Attribute'lar: init, mut
            Constraint'ler:
                payer = user
                space = 8 + UserProfile::LEN
                seeds = [b"profile", user.key().as_ref()]
                bump

        Hesap 3:

            Adı: system_program
            Tipi: Program (System)
            Attribute'lar: Yok
            Constraint'ler: Yok

    Bölüm 3: Ek Ayarlar

        Access Control: Yok
        Event Tetikleme: Profil oluşturulduğunda bir event yayınla
        Hata Yönetimi: Aynı kullanıcı adı mevcutsa özel hata mesajı göster

Örnek Uygulama 2: NFT Mint Etme

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: mint_nft
        Açıklama: Kullanıcı için yeni bir NFT token mint eder.
        Parametreler:
            metadata_uri (String, maksimum uzunluk 200 karakter)

    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: minter
            Tipi: Signer (AccountInfo)
            Attribute'lar: mut, signer
            Constraint'ler: Yok
        
        Hesap 2:

            Adı: nft_mint
            Tipi: Account (Mint)
            Attribute'lar: init, mut
            Constraint'ler:
                payer = minter
                mint::decimals = 0
                mint::authority = minter
        
        Hesap 3:

            Adı: nft_account
            Tipi: Account (TokenAccount)
            Attribute'lar: init, mut
            Constraint'ler:
                payer = minter
                associated_token::mint = nft_mint
                associated_token::authority = minter
        
        Hesap 4:

            Adı: token_program
            Tipi: Program (Token)
            Attribute'lar: Yok
            Constraint'ler: Yok

        Hesap 5:

            Adı: system_program
            Tipi: Program (System)
            Attribute'lar: Yok
            Constraint'ler: Yok

        Hesap 6:

            Adı: rent
            Tipi: Sysvar (Rent)
            Attribute'lar: Yok
            Constraint'ler: Yok

    Bölüm 3: Ek Ayarlar

        Access Control: Minter'ın yetkili olduğunu kontrol et
        Event Tetikleme: Mint edilen NFT'nin adresini içeren bir event yayınla
        Hata Yönetimi: Mint limitine ulaşıldığında hata mesajı göster

Örnek Uygulama 3: Merkeziyetsiz Borsada Emir Verme


    Bölüm 1: Instruction Bilgileri

        Instruction Adı: place_order
        Açıklama: Merkeziyetsiz borsada yeni bir alım/satım emri verir.
        Parametreler:
            order_type (Enum: Alış/Satış)
            amount (u64)
            price (u64)
    
    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: user
            Tipi: Signer (AccountInfo)
            Attribute'lar: mut, signer
            Constraint'ler: Yok
        
        Hesap 2:

            Adı: order_account
            Tipi: Account (Order)
            Attribute'lar: init, mut
            Constraint'ler:
                payer = user
                space = 8 + Order::LEN
                seeds = [b"order", user.key().as_ref(), &[order_count]]
                bump
        
        Hesap 3:

            Adı: user_token_account
            Tipi: Account (TokenAccount)
            Attribute'lar: mut
            Constraint'ler:
                constraint = user_token_account.owner == *user.key
        
        Hesap 4:

            Adı: exchange_token_account
            Tipi: Account (TokenAccount)
            Attribute'lar: mut
            Constraint'ler: Yok

        Hesap 5:

            Adı: token_program
            Tipi: Program (Token)
            Attribute'lar: Yok
            Constraint'ler: Yok

        Hesap 6:

            Adı: system_program
            Tipi: Program (System)
            Attribute'lar: Yok
            Constraint'ler: Yok
    
    Bölüm 3: Ek Ayarlar

        Access Control: Kullanıcının yeterli bakiyeye sahip olduğunu doğrula
        Event Tetikleme: Emir detaylarını içeren bir event yayınla
        Hata Yönetimi: Geçersiz emir parametreleri için hata mesajı göster

Örnek Uygulama 4: DAO'da Oy Kullanma

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: cast_vote
        Açıklama: Bir DAO önerisi üzerinde oy kullanır.
        Parametreler:
            proposal_id (u64)
            vote (Enum: Evet/Hayır)
    
    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: voter
            Tipi: Signer (AccountInfo)
            Attribute'lar: mut, signer
            Constraint'ler: Yok

        Hesap 2:

            Adı: member_account
            Tipi: Account (Member)
            Attribute'lar: mut
            Constraint'ler:
                has_one = voter

        Hesap 3:

            Adı: proposal_account
            Tipi: Account (Proposal)
            Attribute'lar: mut
            Constraint'ler:
                constraint = proposal_account.id == proposal_id
        
        Hesap 4:

            Adı: dao_account
            Tipi: Account (DAO)
            Attribute'lar: Yok
            Constraint'ler: Yok

    Bölüm 3: Ek Ayarlar

        Access Control: Oy kullananın aktif üye olduğunu doğrula
        Event Tetikleme: Oy kullanıldıktan sonra bir event yayınla
        Hata Yönetimi: Tekrarlanan oy veya kapalı öneriler için hata mesajı göster

Örnek Uygulama 5: Kullanıcı Ayarlarını Güncelleme

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: update_settings
        Açıklama: Kullanıcının profil ayarlarını günceller.
        Parametreler:
            new_settings (Struct: UserSettings)
    
    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: user
            Tipi: Signer (AccountInfo)
            Attribute'lar: mut, signer
            Constraint'ler: Yok

        Hesap 2:

            Adı: profile_account
            Tipi: Account (UserProfile)
            Attribute'lar: mut
            Constraint'ler:
                has_one = user
    
    Bölüm 3: Ek Ayarlar

        Access Control: Sadece profil sahibinin ayarları güncellemesine izin ver
        Event Tetikleme: Ayarlar güncellendiğinde bir event yayınla
        Hata Yönetimi: Geçersiz ayar değerleri için hata mesajı göster

Örnek Uygulama 6: Zaman Kilitli Kasayı Oluşturma

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: create_time_locked_vault
        Açıklama: Belirli bir zamana kadar erişilemeyen bir kasa oluşturur.
        Parametreler:
            unlock_time (i64)
    
    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: creator
            Tipi: Signer (AccountInfo)
            Attribute'lar: mut, signer
            Constraint'ler: Yok
        
        Hesap 2:

            Adı: vault_account
            Tipi: Account (Vault)
            Attribute'lar: init, mut
            Constraint'ler:
                payer = creator
                space = 8 + Vault::LEN
                seeds = [b"vault", creator.key().as_ref()]
                bump
        
        Hesap 3:

            Adı: system_program
            Tipi: Program (System)
            Attribute'lar: Yok
            Constraint'ler: Yok
    
    Bölüm 3: Ek Ayarlar

        Access Control: Yok
        Event Tetikleme: Kasa oluşturulduğunda bir event yayınla
        Hata Yönetimi: unlock_time geçmişte ise hata mesajı göster

Örnek Uygulama 7: Stake Programını Başlatma

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: initialize_staking
        Açıklama: Kullanıcı için stake programını başlatır.
        Parametreler:
            stake_amount (u64)

    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: staker
            Tipi: Signer (AccountInfo)
            Attribute'lar: mut, signer
            Constraint'ler: Yok

        Hesap 2:

            Adı: staking_account
            Tipi: Account (Staking)
            Attribute'lar: init, mut
            Constraint'ler:
                payer = staker
                space = 8 + Staking::LEN
                seeds = [b"staking", staker.key().as_ref()]
                bump

        Hesap 3:

            Adı: staker_token_account
            Tipi: Account (TokenAccount)
            Attribute'lar: mut
            Constraint'ler:
                constraint = staker_token_account.owner == *staker.key
        
        Hesap 4:

            Adı: staking_pool_token_account
            Tipi: Account (TokenAccount)
            Attribute'lar: mut
            Constraint'ler: Yok

        Hesap 5:

            Adı: token_program
            Tipi: Program (Token)
            Attribute'lar: Yok
            Constraint'ler: Yok

        Hesap 6:

            Adı: system_program
            Tipi: Program (System)
            Attribute'lar: Yok
            Constraint'ler: Yok

    Bölüm 3: Ek Ayarlar

        Access Control: Staker'ın yeterli tokene sahip olduğunu doğrula
        Event Tetikleme: Stake başlatıldığında bir event yayınla
        Hata Yönetimi: Geçersiz stake miktarları için hata mesajı göster

Örnek Uygulama 8: Hesap Kapatma

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: close_account
        Açıklama: Mevcut bir kullanıcı hesabını kapatır ve lamport'ları geri alır.
        Parametreler: Yok
    
    Bölüm 2: Context Hesapları

        Hesap 1:

        Adı: user
        Tipi: Signer (AccountInfo)
        Attribute'lar: mut, signer
        Constraint'ler: Yok

        Hesap 2:

            Adı: account_to_close
            Tipi: Account (UserAccount)
            Attribute'lar: mut, close = user
            Constraint'ler:
                has_one = user
    
    Bölüm 3: Ek Ayarlar

        Access Control: Kullanıcının hesabın sahibi olduğunu doğrula
        Event Tetikleme: Hesap kapatıldığında bir event yayınla
        Hata Yönetimi: Hesabın bağımlılıkları varsa hata mesajı göster

Örnek Uygulama 9: Yönetici Ayarlarını Güncelleme

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: update_contract_settings
        Açıklama: Yönetici tarafından global sözleşme ayarlarını günceller.
        Parametreler:
            new_settings (Struct: ContractSettings)
    
    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: admin
            Tipi: Signer (AccountInfo)
            Attribute'lar: mut, signer
            Constraint'ler: Yok
        
        Hesap 2:

            Adı: settings_account
            Tipi: Account (Settings)
            Attribute'lar: mut
            Constraint'ler:
                has_one = admin
    
    Bölüm 3: Ek Ayarlar

        Access Control: Sadece yönetici erişimine izin ver
        Event Tetikleme: Ayarlar güncellendiğinde bir event yayınla
        Hata Yönetimi: Yetkisiz erişim için hata mesajı göster

Örnek Uygulama 10: Çoklu İmza Cüzdanı Oluşturma

    Bölüm 1: Instruction Bilgileri

        Instruction Adı: create_multisig_wallet
        Açıklama: Belirlenen sahiplerle çoklu imza cüzdanı oluşturur.
        Parametreler:
            owners (Pubkey dizisi)
                required_signatures (u8)
    
    Bölüm 2: Context Hesapları

        Hesap 1:

            Adı: initiator
            Tipi: Signer (AccountInfo)
            Attribute'lar: signer
            Constraint'ler: Yok
        
        Hesap 2:

            Adı: multisig_account
            Tipi: Account (Multisig)
            Attribute'lar: init, mut
            Constraint'ler:
                payer = initiator
                space = 8 + Multisig::LEN
                seeds = [b"multisig", initiator.key().as_ref()]
                bump

        Hesap 3:

            Adı: system_program
            Tipi: Program (System)
            Attribute'lar: Yok
            Constraint'ler: Yok

    Bölüm 3: Ek Ayarlar

        Access Control: Başlatıcının sahiplerden biri olduğunu doğrula
        Event Tetikleme: Çoklu imza cüzdanı oluşturulduğunda bir event yayınla
        Hata Yönetimi: Geçersiz sahip listesi veya imza sayısı için hata mesajı göster

############ DATA ACCOUNTS ############

1. Örnek Uygulama: Kullanıcı Profili Oluşturma

    #[account]
    pub struct UserProfile {
        // Kullanıcı adı, maksimum 32 karakter
        pub username: String, // 4 (length) + 32 bytes
        // Kullanıcı biyografisi, maksimum 256 karakter
        pub bio: String, // 4 + 256 bytes
    }

    impl UserProfile {
        // Hesap boyutu hesaplama
        pub const LEN: usize = 8  // Discriminator
            + 4 + 32  // username
            + 4 + 256; // bio
        // Toplam: 8 + 36 + 260 = 304 byte
    }

2. Örnek Uygulama: NFT Mint Etme

    #[account]
    pub struct TokenMetadata {
        // NFT'nin adı, maksimum 50 karakter
        pub name: String, // 4 + 50 bytes
        // NFT sembolü, maksimum 10 karakter
        pub symbol: String, // 4 + 10 bytes
        // Metadata URI, maksimum 200 karakter
        pub uri: String, // 4 + 200 bytes
    }

    impl TokenMetadata {
        pub const LEN: usize = 8  // Discriminator
            + 4 + 50  // name
            + 4 + 10  // symbol
            + 4 + 200; // uri
        // Toplam: 8 + 54 + 14 + 204 = 280 byte
    }

3. Örnek Uygulama: Merkeziyetsiz Borsada Emir Verme

    // Emir Türü Enum'ı
    #[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
    pub enum OrderType {
        Buy,
        Sell,
    }

    // Emir Yapısı
    #[account]
    pub struct Order {
        // Kullanıcının cüzdan adresi
        pub user: Pubkey, // 32 bytes
        // Emir türü (Alış/Satış)
        pub order_type: OrderType, // 1 byte (enum olarak depolanır)
        // Miktar
        pub amount: u64, // 8 bytes
        // Fiyat
        pub price: u64, // 8 bytes
        // Oluşturulma zamanı (Unix zaman damgası)
        pub created_at: i64, // 8 bytes
    }

    impl Order {
        pub const LEN: usize = 8  // Discriminator
            + 32  // user
            + 1   // order_type
            + 8   // amount
            + 8   // price
            + 8;  // created_at
        // Toplam: 8 + 32 + 1 + 8 + 8 + 8 = 65 byte
    }

4. Örnek Uygulama: DAO'da Oy Kullanma

    // Oy Seçeneği Enum'ı
    #[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
    pub enum VoteOption {
        Yes,
        No,
    }

    // Öneri Yapısı
    #[account]
    pub struct Proposal {
        // Öneri ID'si
        pub id: u64, // 8 bytes
        // Öneri başlığı, maksimum 100 karakter
        pub title: String, // 4 + 100 bytes
        // Açıklama, maksimum 500 karakter
        pub description: String, // 4 + 500 bytes
        // Oluşturulma zamanı
        pub created_at: i64, // 8 bytes
        // Oylama durumu
        pub is_active: bool, // 1 byte
        // Evet oy sayısı
        pub yes_votes: u64, // 8 bytes
        // Hayır oy sayısı
        pub no_votes: u64, // 8 bytes
    }

    impl Proposal {
        pub const LEN: usize = 8  // Discriminator
            + 8   // id
            + 4 + 100  // title
            + 4 + 500  // description
            + 8   // created_at
            + 1   // is_active
            + 8   // yes_votes
            + 8;  // no_votes
        // Toplam: 8 + 8 + 104 + 504 + 8 + 1 + 8 + 8 = 641 byte
    }

    // Üye Yapısı
    #[account]
    pub struct Member {
        // Üyenin cüzdan adresi
        pub voter: Pubkey, // 32 bytes
        // Üyelik başlangıç tarihi
        pub joined_at: i64, // 8 bytes
        // Aktiflik durumu
        pub is_active: bool, // 1 byte
    }

    impl Member {
        pub const LEN: usize = 8  // Discriminator
            + 32  // voter
            + 8   // joined_at
            + 1;  // is_active
        // Toplam: 8 + 32 + 8 + 1 = 49 byte
    }

5. Örnek Uygulama: Kullanıcı Ayarlarını Güncelleme

    // Kullanıcı Ayarları Yapısı
    #[derive(AnchorSerialize, AnchorDeserialize, Clone)]
    pub struct UserSettings {
        // Bildirimleri alıp almama
        pub receive_notifications: bool, // 1 byte
        // Gizlilik ayarı
        pub is_private: bool, // 1 byte
        // Tercih edilen dil, maksimum 10 karakter
        pub preferred_language: String, // 4 + 10 bytes
    }

    impl UserSettings {
        pub const LEN: usize = 1   // receive_notifications
            + 1   // is_private
            + 4 + 10; // preferred_language
        // Toplam: 1 + 1 + 14 = 16 byte
    }

    // Kullanıcı Profili Yapısı (Ayarları içeren)
    #[account]
    pub struct UserProfile {
        pub username: String, // 4 + 32 bytes
        pub bio: String, // 4 + 256 bytes
        pub settings: UserSettings, // 16 bytes
    }

    impl UserProfile {
        pub const LEN: usize = 8  // Discriminator
            + 4 + 32  // username
            + 4 + 256  // bio
            + UserSettings::LEN; // settings
        // Toplam: 8 + 36 + 260 + 16 = 320 byte
    }

6. Örnek Uygulama: Zaman Kilitli Kasayı Oluşturma

    // Kasa Yapısı
    #[account]
    pub struct Vault {
        // Kasayı oluşturan kullanıcının adresi
        pub owner: Pubkey, // 32 bytes
        // Kilit açma zamanı (Unix zaman damgası)
        pub unlock_time: i64, // 8 bytes
        // Kasadaki bakiye (örneğin, lamport miktarı)
        pub balance: u64, // 8 bytes
    }

    impl Vault {
        pub const LEN: usize = 8  // Discriminator
            + 32  // owner
            + 8   // unlock_time
            + 8;  // balance
        // Toplam: 8 + 32 + 8 + 8 = 56 byte
    }

7. Örnek Uygulama: Stake Programını Başlatma

    // Stake Yapısı
    #[account]
    pub struct Staking {
        // Staker'ın adresi
        pub staker: Pubkey, // 32 bytes
        // Stake miktarı
        pub amount: u64, // 8 bytes
        // Başlangıç zamanı
        pub start_time: i64, // 8 bytes
        // Ödül oranı (örneğin, yüzde olarak)
        pub reward_rate: u64, // 8 bytes
    }

    impl Staking {
        pub const LEN: usize = 8  // Discriminator
            + 32  // staker
            + 8   // amount
            + 8   // start_time
            + 8;  // reward_rate
        // Toplam: 8 + 32 + 8 + 8 + 8 = 64 byte
    }

8. Örnek Uygulama: Hesap Kapatma

    Instruction'da #[account(mut, close = recipient)] kullanılarak hesap kapatma işlemi gerçekleştirilir. Data Account'ta herhangi birşeye gerek yok.

9. Örnek Uygulama: Yönetici Ayarlarını Güncelleme

    // Sözleşme Ayarları Yapısı
    #[account]
    pub struct ContractSettings {
        // Yönetici adresi
        pub admin: Pubkey, // 32 bytes
        // Ücret oranı (örneğin, binde bir olarak)
        pub fee_rate: u64, // 8 bytes
        // Aktiflik durumu
        pub is_active: bool, // 1 byte
    }

    impl ContractSettings {
        pub const LEN: usize = 8  // Discriminator
            + 32  // admin
            + 8   // fee_rate
            + 1;  // is_active
        // Toplam: 8 + 32 + 8 + 1 = 49 byte
    }

10. Örnek Uygulama: Çoklu İmza Cüzdanı Oluşturma

    // Çoklu İmza Yapısı
    #[account]
    pub struct Multisig {
        // Sahiplerin listesi
        pub owners: Vec<Pubkey>, // Dinamik boyutlu dizi
        // Gerekli imza sayısı
        pub required_signatures: u8, // 1 byte
    }

    impl Multisig {
        // Maksimum sahip sayısı belirlenebilir, örneğin 10
        pub const MAX_OWNERS: usize = 10;

        pub const LEN: usize = 8  // Discriminator
            + 4 + (32 * Self::MAX_OWNERS)  // owners: 4 byte uzunluk + maksimum sahip sayısı * 32 byte
            + 1;  // required_signatures
        // Toplam: 8 + 4 + 320 + 1 = 333 byte
    }
