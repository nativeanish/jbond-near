use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId};
near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Jbond {
    e_msg: String,
    image: String,
    meta_data: String,
    solver: UnorderedMap<u64, AccountId>,
}

#[near_bindgen]
impl Jbond {
    pub fn get(&self) -> (String, String, String, Vec<(AccountId, u64)>) {
        let mut account: Vec<(AccountId, u64)> = vec![];
        for (a, b) in self.solver.iter() {
            account.push((b, a));
        }
        return (
            self.e_msg.to_owned(),
            self.image.to_owned(),
            self.meta_data.to_owned(),
            account,
        );
    }

    pub fn solved(&mut self, msg: String) -> (String, String, String, Vec<(AccountId, u64)>) {
        if self.e_msg == msg {
            let id = self.solver.len() + 1;
            let account = env::signer_account_id();
            self.solver.insert(&id, &account);
        }
        return self.get();
    }
}
impl Default for Jbond {
    fn default() -> Self {
        Self {
            image: IMAGE.to_string(),
            solver: UnorderedMap::new("o".as_bytes()),
            e_msg: String::from("a23e9cdda7a3e0db6beb14e7dfa5b91817fd71332606a985b3588fcb800ba793"),
            meta_data: String::from("Mt. Everest"),
        }
    }
}
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};
    fn get_context(predecessor_account_id: String, storage_usage: u64) -> VMContext {
        VMContext {
            current_account_id: "jbond".to_string(),
            signer_account_id: "anish.testnet".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id,
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }
    #[test]
    fn test() {
        //!!!!!!!!!! This is the right way
        let context = get_context("anish.testnet".to_string(), 0);
        testing_env!(context);
        let mut contract = Jbond::default();
        contract
            .solved("a23e9cdda7a3e0db6beb14e7dfa5b91817fd71332606a985b3588fcb800ba793".to_string());
        let take = ("anish.testnet".to_string(), 1);
        assert_eq!(
            contract.get(),
            (
                "a23e9cdda7a3e0db6beb14e7dfa5b91817fd71332606a985b3588fcb800ba793".to_string(),
                IMAGE.to_string(),
                "Mt. Everest".to_string(),
                vec![take],
            )
        )
    }
}